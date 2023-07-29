using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.Net;

var builder = WebApplication.CreateBuilder(args);
{
    IdentityModelEventSource.ShowPII = true;
    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
    builder.Services.AddControllers();

    builder.Services.AddDbContext<AuctionDbContext>(opts =>
    {
        opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    builder.Services.AddMassTransit(x =>
    {
        x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();

        x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction", false));

        x.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
        {
            o.QueryDelay = TimeSpan.FromSeconds(10);

            o.UsePostgres();
            o.UseBusOutbox();
        });

        x.UsingRabbitMq((context, cfg) =>
        {
            cfg.ConfigureEndpoints(context);
        });
    });

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = builder.Configuration["IdentityServiceUrl"];
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters.ValidateAudience = false;
            options.TokenValidationParameters.NameClaimType = "username";
        });
}

var app = builder.Build();
{
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();


    try
    {
        DbInitializer.InitDb(app);
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
    }

    app.Run();
}
