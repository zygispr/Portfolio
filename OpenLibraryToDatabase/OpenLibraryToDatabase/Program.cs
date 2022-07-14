using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenLibraryToDatabase;
using OpenLibraryToDatabase.Database;

using IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration(app =>{
        app.AddJsonFile("appsettings.json");
    })
    .ConfigureServices((host, services) =>
    {
        var config = host.Configuration;
        
        services.AddDbContext<ApplicationDbContext>();
        // services.AddSingleton<Settings>();
        // services.AddSingleton<DatabaseEngine>();
        services.AddTransient<IOpenLibraryAPI, OpenLibraryAPI>();
        
        services.AddScoped<IApp, App>();
    }).Build();

await host.Services.GetRequiredService<IApp>().Run();




