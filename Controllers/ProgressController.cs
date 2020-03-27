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
    public class ProgressController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ProgressController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Progress
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentProgress>>> GetStudentProgresses()
        {
            return await _context.StudentProgresses.ToListAsync();
        }

        // GET: api/Progress/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentProgress>> GetStudentProgress(int id)
        {
            var studentProgress = await _context.StudentProgresses.FindAsync(id);

            if (studentProgress == null)
            {
                return NotFound();
            }

            return studentProgress;
        }

        // PUT: api/Progress/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentProgress(int id, StudentProgress studentProgress)
        {
            if (id != studentProgress.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentProgress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentProgressExists(id))
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

        // POST: api/Progress
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentProgress>> PostStudentProgress(StudentProgress studentProgress)
        {
            _context.StudentProgresses.Add(studentProgress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentProgress", new { id = studentProgress.Id }, studentProgress);
        }

        // DELETE: api/Progress/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentProgress>> DeleteStudentProgress(int id)
        {
            var studentProgress = await _context.StudentProgresses.FindAsync(id);
            if (studentProgress == null)
            {
                return NotFound();
            }

            _context.StudentProgresses.Remove(studentProgress);
            await _context.SaveChangesAsync();

            return studentProgress;
        }

        private bool StudentProgressExists(int id)
        {
            return _context.StudentProgresses.Any(e => e.Id == id);
        }
    }
}
