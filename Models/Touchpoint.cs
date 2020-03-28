using System;
using System.Text.Json.Serialization;

namespace StudentLifeTracker.Models
{
  public class TouchPoint
  {
    public int Id { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;

    public string Description { get; set; }
    public int StudentId { get; set; }
    [JsonIgnore]
    public Student Student { get; set; }
  }
}