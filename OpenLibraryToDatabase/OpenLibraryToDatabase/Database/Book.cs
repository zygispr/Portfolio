using System.ComponentModel.DataAnnotations;

namespace OpenLibraryToDatabase.Database;

public class Book
{
    [Key]
    public string BookID { get; set; }
    public string Title { get; set; }
    public int NumberOfPages { get; set; }
    public string AuthorID { get; set; }

    public Book() { }

    public Book(BookDTO bookDTO)
    {
        BookID = bookDTO.key.Split("/")[2];
        Title = bookDTO.title;
        NumberOfPages = bookDTO?.number_of_pages ?? 0;
        
        if ((bookDTO?.AuthorDTO?.Count ?? 0) == 0)
        {
            AuthorID = "NAN";
        }
        else
        {
            AuthorID = bookDTO?.AuthorDTO[0]?.DatabaseID ?? "NAN";
        }
    }
}