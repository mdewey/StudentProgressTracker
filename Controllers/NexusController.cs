using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentLifeTracker.Models;

namespace StudentLifeTracker.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NexusController : ControllerBase
  {

    readonly HttpClient client = new HttpClient();

    private string TOKEN = "";
    readonly string BASE_URL = " https://pylon.suncoast.io/api/v1";

    readonly private DatabaseContext _context;


    public NexusController(IConfiguration configuration, DatabaseContext context)
    {
      _context = context;
      var secret = configuration["SETTINGS:NEXUS_TOKEN"];
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

      return Ok();
    }

  }

}
