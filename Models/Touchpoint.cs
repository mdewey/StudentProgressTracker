using System;

namespace StudentLifeTracker.Models
{
  public class Touchpoint
  {
    public int Id { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;

    public string Description { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
  }
}