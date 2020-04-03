using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentLifeTracker.Models;

namespace StudentLifeTracker.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class NexusController : ControllerBase
  {

    readonly HttpClient client = new HttpClient();

    private string TOKEN = "";
    readonly string BASE_URL = " https://pylon.suncoast.io/api/v1";

    readonly private DatabaseContext _context;


    public NexusController(IConfiguration configuration, DatabaseContext context)
    {
      _context = context;
      var secret = configuration["NEXUS_TOKEN"];
      this.TOKEN = $@"token=""{secret}""";

      client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", this.TOKEN);
    }


    [HttpGet("cohorts")]
    public async Task<ActionResult> GetAllCohortsFromNexus()
    {

      var response = await client.GetAsync($"{BASE_URL}/cohorts");
      response.EnsureSuccessStatusCode();
      var data = await response.Content.ReadAsStringAsync();
      return Ok(data);
    }

    [HttpPost("cohorts/{cohortId}/students")]
    public async Task<ActionResult> SyncStudentsForCohort(int cohortId)
    {
      // find cohort
      var cohort = _context.Cohorts.FirstOrDefault(f => f.Id == cohortId);
      if (cohort == null)
      {
        return NotFound();
      }
      var response = await client.GetAsync($"{BASE_URL}/cohorts/{cohort.PylonId}?include=people");
      response.EnsureSuccessStatusCode();
      var data = await response.Content.ReadAsStringAsync();
      using var jsonDoc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
      var root = jsonDoc.RootElement;
      var included = root.GetProperty("included");

      foreach (var person in included.EnumerateArray())
      {
        Console.WriteLine($"{person}");
        var attributes = person.GetProperty("attributes");
        var student = new Student
        {
          FullName = attributes.GetProperty("full_name").GetString(),
          GitHub = attributes.GetProperty("github").GetString(),
          PylonId = int.Parse(person.GetProperty("id").GetString())
        };

        var exists = _context.Students.FirstOrDefault(f => f.PylonId == student.PylonId);
        if (exists == null)
        {
          _context.Students.Add(student);
          var progress = new StudentProgress
          {
            CohortId = cohort.Id,
            Student = student
          };
          _context.StudentProgresses.Add(progress);
        }
      }

      await _context.SaveChangesAsync();
      return Ok(data);
    }

  }

}
