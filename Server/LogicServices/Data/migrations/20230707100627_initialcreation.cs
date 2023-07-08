using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogicServices.Data.migrations
{
    /// <inheritdoc />
    public partial class initialcreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UsersData",
                columns: table => new
                {
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    page1 = table.Column<string>(type: "TEXT", nullable: true),
                    page2 = table.Column<string>(type: "TEXT", nullable: true),
                    page3 = table.Column<string>(type: "TEXT", nullable: true),
                    url = table.Column<string>(type: "TEXT", nullable: true),
                    color = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersData", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "UsersStatistics",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    loginDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    clicks = table.Column<int>(type: "INTEGER", nullable: true),
                    city = table.Column<string>(type: "TEXT", nullable: true),
                    download = table.Column<bool>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersStatistics", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersData");

            migrationBuilder.DropTable(
                name: "UsersStatistics");
        }
    }
}
