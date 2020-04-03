using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentLifeTracker.Services;

namespace StudentLifeTracker.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    private readonly AuthService authService;

    public AuthController(AuthService service)
    {
      this.authService = service;
    }

    [HttpGet("callback/{jwt}")]
    public async Task<ActionResult> Callback(string jwt)
    {
      // take JWT, create my own JWT with that as the claim
      var token = this.authService.CreateJwt(new Dictionary<string, string>{
          {"jwt", jwt}
      });
      return Redirect($"/callback/{token}");
      //   return Ok(new
      //   {
      //     jwt,
      //     token
      //   });

    }
  }
}