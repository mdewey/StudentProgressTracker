using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentLifeTracker.Models;
using StudentLifeTracker.Services;

namespace StudentLifeTracker.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    private readonly AuthService _authService;
    private readonly DatabaseContext _context;

    public AuthController(AuthService service, DatabaseContext context)
    {
      this._authService = service;
      this._context = context;
    }

    [HttpGet("callback/{jwt}")]
    public async Task<ActionResult> Callback(string jwt)
    {
      var isAllowed = false;
      // open JWT, see if useId can see the 
      var handler = new JwtSecurityTokenHandler();
      var tokenData = handler.ReadJwtToken(jwt);
      var pylonId = tokenData.Claims.FirstOrDefault(f => f.Type == "sub").Value;
      Console.WriteLine($"{pylonId}");

      var user = await _context.PylonUsers.FirstOrDefaultAsync(user => user.PylonId == int.Parse(pylonId));

      isAllowed = user == null ? false : user.Allowed;


      if (isAllowed)
      // take JWT, create my own JWT with that as the claim
      {
        var token = this._authService.CreateJwt(new Dictionary<string, string>{
          {"jwt", jwt}
        });
        return Redirect($"/callback/{token}");
      }
      else
      {
        var pylonUser = new PylonUser
        {
          Allowed = false,
          PylonId = int.Parse(pylonId)
        };
        _context.PylonUsers.Add(pylonUser);
        await _context.SaveChangesAsync();
        return Redirect($"/nope");
      }
      //   return Ok(new
      //   {
      //     jwt,
      //     token
      //   });

    }
  }
}