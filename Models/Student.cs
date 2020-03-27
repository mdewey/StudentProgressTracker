using System.Collections.Generic;

namespace StudentLifeTracker.Models
{
  public class Student
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public string GitHub { get; set; }
    public int PylonId { get; set; }
    public string Email { get; set; }

    public List<StudentProgress> StudentProgresses { get; set; } = new List<StudentProgress>();
    public List<Touchpoint> Touchpoints { get; set; } = new List<Touchpoint>();

  }
}