using Microsoft.EntityFrameworkCore;

namespace OpenLibraryToDatabase.Database;

public class App : IApp
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IOpenLibraryAPI _openLibraryAPI;

    public App(ApplicationDbContext dbContext, IOpenLibraryAPI openLibraryAPI)
    {
        _dbContext = dbContext;
        _openLibraryAPI = openLibraryAPI;
    }

    public async Task Run()
    {
        
        Console.WriteLine("Book IDs:");
        var bookIDs = await _openLibraryAPI.GetRandomBookIDs(5);
        
        Console.WriteLine("\nBook titles:");
        var bookDTOs = await _openLibraryAPI.GetBookDTOs(bookIDs);

        await _openLibraryAPI.AddAuthorsToBooks(bookDTOs);

        await AddAuthorsToDatabase(bookDTOs);
        await AddBooksToDatabase(bookDTOs);

        // var authorsFromDb = _dbContext.Authors;
        // Console.WriteLine(authorsFromDb.Any(a => a.AuthorID == "OL340891A"));
    }

    private async Task AddAuthorToDatabase(BookDTO bookDTO)
    {
        if (bookDTO?.AuthorDTO is not null)
        {
            foreach (var authorDTO in bookDTO.AuthorDTO)
            {
                var author = new Author(authorDTO);

                try
                {
                    if (_dbContext.Authors.Any(a => a.AuthorID != author.AuthorID))
                    {
                        _dbContext.Authors.Add(author);
                        await _dbContext.SaveChangesAsync();
                    
                        authorDTO.DatabaseID = author.AuthorID;

                        Console.WriteLine($"Author {author.AuthorID} added to DB");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error while saving Author to DB");
                    Console.WriteLine($"{e}\n");
                }
            }
        }
    }

    private async Task AddAuthorsToDatabase(List<BookDTO> bookDTOs)
    {
        foreach (var bookDTO in bookDTOs)
        {
            await AddAuthorToDatabase(bookDTO);
        }
    }

    private async Task AddBookToDatabase(BookDTO bookDTO)
    {
        if (bookDTO is not null)
        {
            var book = new Book(bookDTO);

            try
            {
                if (_dbContext.Books.Any(b => b.BookID != book.BookID))
                {
                    _dbContext.Books.Add(book);
                    await _dbContext.SaveChangesAsync();
                
                    Console.WriteLine($"Book {book.BookID} added to DB");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error while saving Book to DB");
                Console.WriteLine($"{e}\n");
            }
        }
    }

    private async Task AddBooksToDatabase(List<BookDTO> bookDTOs)
    {
        var bookList = new List<Book>();

        foreach (var bookDTO in bookDTOs)
        {
            /*
            if (bookDTO is not null)
            {
                bookList.Add(new Book(bookDTO));
            }
            
            _dbContext.AddRange(bookList);
            await _dbContext.SaveChangesAsync();
            */

            await AddBookToDatabase(bookDTO);
        }
    }

}