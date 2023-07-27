using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddHttpClient<AuctionServiceClient>();
}


var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    await DbInitializer.InitDb(app);

    app.Run();
}

