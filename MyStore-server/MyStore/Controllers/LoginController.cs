using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            // הגדרת ברירת מחדל לרול
            string role = "user";

            // בדיקת האם המשתמש הוא מנהל
            if (userLogin.UserName == "ROren" && userLogin.Email == "ROren7878@gmail.com")
            {
                role = "manager";
            }

            // יצירת רשימת קליימים (שם ורול)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userLogin.UserName),
                new Claim(ClaimTypes.Role, role)
            };

            // יצירת מפתח סודי
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SomeLongKeyForGenerateMyJwtToken"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            // יצירת הטוקן
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:7194/",
                audience: "https://localhost:7194/",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signinCredentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new { token = token, role = role });
        }
    }
}
