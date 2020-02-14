using Microsoft.EntityFrameworkCore.Migrations;

namespace vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (name) VALUES ('Make1')");
            migrationBuilder.Sql("INSERT INTO Makes (name) VALUES ('Make2')");
            migrationBuilder.Sql("INSERT INTO Makes (name) VALUES ('Make3')");
            
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model1-Make1', 1)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model2-Make1', 1)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model3-Make1', 1)");

            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model1-Make2', 2)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model2-Make2', 2)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model3-Make2', 2)");

            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model1-Make3', 3)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model2-Make3', 3)");
            migrationBuilder.Sql("INSERT INTO Models (name, MakeId) VALUES ('Model3-Make3', 3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete from Makes
        }
    }
}
