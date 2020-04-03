using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace StudentLifeTracker.Services
{
  public class AuthService
  {
    private readonly string _JWT_SECRET;

    public AuthService(IConfiguration configuration)
    {
      this._JWT_SECRET = configuration.GetValue<string>("JWT_SECRET");
    }

    public string CreateJwt(Dictionary<string, string> claims = null)
    {
      var expirationTime = DateTime.UtcNow.AddDays(7);

      var _claims = claims.Select(s => new Claim(s.Key, s.Value));

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(_claims),
        Expires = expirationTime,
        SigningCredentials = new SigningCredentials(
               new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this._JWT_SECRET)),
              SecurityAlgorithms.HmacSha256Signature
          )
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
      return token;
    }

  }
}