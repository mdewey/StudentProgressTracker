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

  public class UsersController : ControllerBase
  {
    private readonly DatabaseContext _context;


    public UsersController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PylonUser>>> GetPylonUsers()
    {
      return await _context.PylonUsers.ToListAsync();
    }

    // GET: api/Users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<PylonUser>> GetPylonUser(int id)
    {
      var pylonUser = await _context.PylonUsers.FindAsync(id);

      if (pylonUser == null)
      {
        return NotFound();
      }

      return pylonUser;
    }

    // PUT: api/Users/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPylonUser(int id, PylonUser pylonUser)
    {
      if (id != pylonUser.Id)
      {
        return BadRequest();
      }

      _context.Entry(pylonUser).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!PylonUserExists(id))
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

    // POST: api/Users
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<PylonUser>> PostPylonUser(PylonUser pylonUser)
    {
      _context.PylonUsers.Add(pylonUser);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetPylonUser", new { id = pylonUser.Id }, pylonUser);
    }

    // DELETE: api/Users/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<PylonUser>> DeletePylonUser(int id)
    {
      var pylonUser = await _context.PylonUsers.FindAsync(id);
      if (pylonUser == null)
      {
        return NotFound();
      }

      _context.PylonUsers.Remove(pylonUser);
      await _context.SaveChangesAsync();

      return pylonUser;
    }

    private bool PylonUserExists(int id)
    {
      return _context.PylonUsers.Any(e => e.Id == id);
    }
  }
}
