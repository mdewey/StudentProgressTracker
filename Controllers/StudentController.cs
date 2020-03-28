using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentLifeTracker.Models;

namespace StudentLifeTracker.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StudentController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public StudentController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Student
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
      return await _context.Students.ToListAsync();
    }

    // GET: api/Student/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
      var student = await _context.Students.FindAsync(id);

      if (student == null)
      {
        return NotFound();
      }

      return student;
    }

    // GET: api/Student/5
    [HttpGet("{id}/data")]
    public async Task<ActionResult> GetStudentData(int id)
    {
      var student = await _context
        .Students
        .Include(i => i.StudentProgresses)

        .FirstOrDefaultAsync(f => f.Id == id);

      var touchPoints = _context.TouchPoints.Where(w => w.StudentId == id).OrderByDescending(o => o.Timestamp);

      if (student == null)
      {
        return NotFound();
      }

      return Ok(new { student, touchPoints });
    }

    // PUT: api/Student/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStudent(int id, Student student)
    {
      if (id != student.Id)
      {
        return BadRequest();
      }

      _context.Entry(student).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!StudentExists(id))
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

    // POST: api/Student
    [HttpPost]
    public async Task<ActionResult<Student>> PostStudent(Student student)
    {
      _context.Students.Add(student);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetStudent", new { id = student.Id }, student);
    }


    [HttpPost("{studentId}/touchpoint")]
    public async Task<ActionResult<Student>> AddTouchpointForStudent(int studentId, TouchPoint touchpoint)
    {
      touchpoint.StudentId = studentId;
      _context.TouchPoints.Add(touchpoint);
      await _context.SaveChangesAsync();

      return Ok(touchpoint);
    }

    // DELETE: api/Student/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Student>> DeleteStudent(int id)
    {
      var student = await _context.Students.FindAsync(id);
      if (student == null)
      {
        return NotFound();
      }

      _context.Students.Remove(student);
      await _context.SaveChangesAsync();

      return student;
    }


    // DELETE: api/Student/5
    [HttpDelete()]
    public async Task<ActionResult> DeleteStudent()
    {
      var students = _context.Students;
      _context.Students.RemoveRange(students);
      await _context.SaveChangesAsync();

      return Ok();
    }

    private bool StudentExists(int id)
    {
      return _context.Students.Any(e => e.Id == id);
    }
  }
}
