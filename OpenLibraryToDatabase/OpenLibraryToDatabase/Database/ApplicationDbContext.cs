using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace OpenLibraryToDatabase.Database;

public class ApplicationDbContext : DbContext
{
    private IConfiguration _configuration;

    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }

    public ApplicationDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("OpenLibraryConnection"));
    }
}