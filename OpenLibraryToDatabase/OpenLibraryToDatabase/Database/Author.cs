using System.ComponentModel.DataAnnotations;

namespace OpenLibraryToDatabase.Database;

public class Author
{
    [Key]
    public string AuthorID { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }

    public Author() { }

    public Author(AuthorDTO authorDTO)
    {
        AuthorID = authorDTO.key.Split("/")[2];
        // AuthorID = authorDTO.DatabaseID;

        var names = authorDTO.name.Split(" ");

        if (names.Length > 1)
        {
            Name = names[0];
            Surname = string.Empty;

            for (int i = 1; i < names.Length; i++)
            {
                Surname += $"{names[i]} ";
            }
        }
        else
        {
            Name = string.IsNullOrEmpty(authorDTO.name) ? "Unknown" : authorDTO.name;
            Surname = string.IsNullOrEmpty(authorDTO.name) ? "Unknown" : authorDTO.name;
        }
    }
}