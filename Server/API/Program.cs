using LogicServices.Data;
using LogicServices.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataService>();
builder.Services.AddScoped<StatisticsService>();
builder.Services.AddScoped<IdentificationService>();

try
{
    builder.Services.AddDbContext<DataContext>(opt =>
    {
        opt.UseSqlite(builder.Configuration.GetConnectionString("app"));
    });

}
catch (System.Exception)
{
    System.Console.WriteLine("worng set database");
    throw;
}

// add AutoMapper
builder.Services.AddAutoMapper(typeof(Program)); 
builder.Services.AddControllersWithViews();

// add cors 
builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//http://api-dev.eba-kscnxhfp.us-east-1.elasticbeanstalk.com/

app.UseAuthorization();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();

app.MapFallbackToController("index", "Fallback");


app.Run();
