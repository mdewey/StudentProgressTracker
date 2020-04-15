using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentLifeTracker.Models;

namespace StudentLifeTracker.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class CohortController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public CohortController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Cohort
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cohort>>> GetCohorts()
    {
      return await _context.Cohorts.ToListAsync();
    }

    // GET: api/Cohort/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cohort>> GetCohort(int id)
    {
      var cohort = await _context.Cohorts.FindAsync(id);

      if (cohort == null)
      {
        return NotFound();
      }

      return cohort;
    }


    // GET: api/Cohort/5
    [HttpGet("{id}/data")]
    public async Task<ActionResult<Cohort>> GetAllCohortData(int id)
    {
      var cohort = await _context.Cohorts.FirstOrDefaultAsync(f => f.Id == id);
      if (cohort == null)
      {
        return NotFound();
      }

      // get students based on this cohort
      var students = _context.StudentProgresses
        .Include(i => i.Student)
        .Where(w => w.CohortId == id)
        .Select(s => new { s.Student.FullName, s.Student.Id, s.Student.GitHub, s.Student.PylonId, s.ConcernedLevel })
        .OrderBy(o => o.FullName.Trim());
      return Ok(
          new
          {
            cohort,
            students
          }
      );
    }

    [HttpGet("{id}/concerned")]
    public async Task<ActionResult<Cohort>> GetConcernedStudents(int id)
    {
      var cohort = await _context.Cohorts.FirstOrDefaultAsync(f => f.Id == id);
      if (cohort == null)
      {
        return NotFound();
      }
      // find the top 4 concerened amounts, get all students that have that level or greater
      var fourth = _context
      .StudentProgresses
      .Where(w => w.CohortId == id)
      .Select(s => s.ConcernedLevel)
      .Distinct()
      .OrderByDescending(o => o)
      .Take(4)
      .Last();


      var students = _context.StudentProgresses
        .Include(i => i.Student)
        .Where(w => w.CohortId == id && w.ConcernedLevel >= fourth && w.ConcernedLevel >= 5)
        .Select(s => new { s.Student.FullName, s.Student.Id, s.Student.GitHub, s.Student.PylonId, s.ConcernedLevel })
        .OrderByDescending(o => o.ConcernedLevel);
      return Ok(
          new
          {

            students
          }
      );
    }


    [HttpGet("{id}/touchpoints/today")]
    public async Task<ActionResult<Cohort>> GetTodaysTouches(int id)
    {
      var cohort = await _context.Cohorts.FirstOrDefaultAsync(f => f.Id == id);
      if (cohort == null)
      {
        return NotFound();
      }
      var todays = _context
      .Cohorts
      .Include(i => i.StudentProgress)
      .ThenInclude(t => t.Student)
      .ThenInclude(t => t.Touchpoints)
      .Where(f => f.Id == id)
      .SelectMany(s => s.StudentProgress.Select(e => e.Student).SelectMany(l => l.Touchpoints))
      .Where(t => t.Timestamp.Day == DateTime.Now.Day)
      .Select(s => new { s.Description, s.Id, s.StudentId, s.Student.FullName, s.Timestamp });

      return Ok(todays);

    }

    [HttpGet("{id}/no/touch")]
    public async Task<ActionResult<Cohort>> GetOutTouchStudents(int id)
    {
      var cohort = await _context.Cohorts.FirstOrDefaultAsync(f => f.Id == id);
      if (cohort == null)
      {
        return NotFound();
      }
      //find the students with no touch points or a touch point that is > 48 hours ago
      var students = _context.StudentProgresses
             .Include(i => i.Student)
             .Where(w => w.CohortId == id)
             .Select(s => s.Student).ToList();

      var studentIds = students.Select(s => s.Id);


      var latestTouchPoints = _context
      .TouchPoints
      .Where(w => studentIds.Contains(w.StudentId))
      .OrderByDescending(o => o.Timestamp).ToList();

      var latestPoints = new Dictionary<int, TouchPoint>();
      foreach (var student in students)
      {
        var tp = latestTouchPoints.Where(w => w.StudentId == student.Id).OrderByDescending(o => o.Timestamp).FirstOrDefault();
        latestPoints.Add(student.Id, tp);
      }
      DateTime threshold = DateTime.UtcNow.Date.AddDays(-2);
      var thing = latestPoints.Where(w => w.Value == null || w.Value.Timestamp <= threshold).Select(s => s.Key);

      var rv = students.Where(w => thing.Contains(w.Id));

      return Ok(
          new
          {
            students = rv
          }
      );
    }
    // PUT: api/Cohort/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCohort(int id, Cohort cohort)
    {
      if (id != cohort.Id)
      {
        return BadRequest();
      }

      _context.Entry(cohort).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CohortExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Cohort
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Cohort>> PostCohort(Cohort cohort)
    {
      _context.Cohorts.Add(cohort);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetCohort", new { id = cohort.Id }, cohort);
    }

    // DELETE: api/Cohort/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Cohort>> DeleteCohort(int id)
    {
      var cohort = await _context.Cohorts.FindAsync(id);
      if (cohort == null)
      {
        return NotFound();
      }

      _context.Cohorts.Remove(cohort);
      await _context.SaveChangesAsync();

      return cohort;
    }

    private bool CohortExists(int id)
    {
      return _context.Cohorts.Any(e => e.Id == id);
    }
  }
}
