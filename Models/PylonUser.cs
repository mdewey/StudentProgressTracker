using System;

namespace StudentLifeTracker.Models
{
  public class PylonUser
  {
    public int Id { get; set; }
    public string GitHub { get; set; }
    public DateTime LastLoggedIn { get; set; } = DateTime.UtcNow;
    public int PylonId { get; set; }
    public bool Allowed { get; set; }
  }
}