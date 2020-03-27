using System.Text.Json.Serialization;

namespace StudentLifeTracker.Models
{
  public class StudentProgress
  {
    public int Id { get; set; }
    public bool Has1On1 { get; set; }

    public int ConcernedLevel { get; set; } = 0;

    public bool CapstoneHasBeenApproved { get; set; }
    public string CapstoneIdea { get; set; }
    public bool TurnedInWireFrames { get; set; }

    public int StudentId { get; set; }

    [JsonIgnore]
    public Student Student { get; set; }
    public int CohortId { get; set; }


    public Cohort Cohort { get; set; }

  }
}