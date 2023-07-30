using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
{
	builder.Services.AddReverseProxy()
		.LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

	builder.Services.AddCors();

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
	app.MapReverseProxy();
	app.UseCors(pol => pol.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

	app.UseAuthentication();
	app.UseAuthorization();

	app.Run();
}
