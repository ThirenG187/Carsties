using SearchService.Data;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
}


var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    await DbInitializer.InitDb(app);

    app.Run();
}

