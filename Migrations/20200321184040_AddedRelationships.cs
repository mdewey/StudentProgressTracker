using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentLifeTracker.Migrations
{
    public partial class AddedRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CohortId",
                table: "StudentProgresses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "StudentProgresses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentProgresses_CohortId",
                table: "StudentProgresses",
                column: "CohortId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentProgresses_StudentId",
                table: "StudentProgresses",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentProgresses_Cohorts_CohortId",
                table: "StudentProgresses",
                column: "CohortId",
                principalTable: "Cohorts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentProgresses_Students_StudentId",
                table: "StudentProgresses",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentProgresses_Cohorts_CohortId",
                table: "StudentProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentProgresses_Students_StudentId",
                table: "StudentProgresses");

            migrationBuilder.DropIndex(
                name: "IX_StudentProgresses_CohortId",
                table: "StudentProgresses");

            migrationBuilder.DropIndex(
                name: "IX_StudentProgresses_StudentId",
                table: "StudentProgresses");

            migrationBuilder.DropColumn(
                name: "CohortId",
                table: "StudentProgresses");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "StudentProgresses");
        }
    }
}
