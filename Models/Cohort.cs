using System;
using System.Collections.Generic;

namespace StudentLifeTracker.Models
{
  public class Cohort
  {
    public int Id { get; set; }
    public int PylonId { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<StudentProgress> StudentProgress { get; set; } = new List<StudentProgress>();
  }
}