using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentLifeTracker.Migrations
{
    public partial class renamedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Touchpoints_Students_StudentId",
                table: "Touchpoints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Touchpoints",
                table: "Touchpoints");

            migrationBuilder.RenameTable(
                name: "Touchpoints",
                newName: "TouchPoints");

            migrationBuilder.RenameIndex(
                name: "IX_Touchpoints_StudentId",
                table: "TouchPoints",
                newName: "IX_TouchPoints_StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TouchPoints",
                table: "TouchPoints",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TouchPoints_Students_StudentId",
                table: "TouchPoints",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TouchPoints_Students_StudentId",
                table: "TouchPoints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TouchPoints",
                table: "TouchPoints");

            migrationBuilder.RenameTable(
                name: "TouchPoints",
                newName: "Touchpoints");

            migrationBuilder.RenameIndex(
                name: "IX_TouchPoints_StudentId",
                table: "Touchpoints",
                newName: "IX_Touchpoints_StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Touchpoints",
                table: "Touchpoints",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Touchpoints_Students_StudentId",
                table: "Touchpoints",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
