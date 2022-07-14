using System.Net;
using System.Text.RegularExpressions;
using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace OpenLibraryToDatabase;

public class OpenLibraryAPI : IOpenLibraryAPI
{
    private readonly string _openLibraryUrl = "https://openlibrary.org";

    private async Task<string> ScrapePage(string url)
    {
        using var client = new HttpClient();
        var result = await client.GetAsync(url);
        return await result.Content.ReadAsStringAsync();
    }

    private async Task<string> GetRandomBookID()
    {
        try
        {
            var pageContent = await ScrapePage($"{_openLibraryUrl}/random");

            var cssSelector = "dd .object";
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(pageContent);

            var elements = htmlDocument.QuerySelectorAll(cssSelector);

            string pattern = @"^OL\w+M$";
            string bookID = string.Empty;
            
            foreach (var element in elements)
            {
                MatchCollection matchCollection = Regex.Matches(element.InnerText.Trim(), pattern);

                if (matchCollection.Count == 1)
                {
                    bookID = matchCollection[0].Value;
                }
            }
            Console.WriteLine(bookID);

            return bookID;
        }
        catch (Exception e)
        {
            // Console.WriteLine($"Failed to reach {_openLibraryUrl}/random");
            Console.WriteLine(e.Message);
        }

        return null;
    }

    public async Task<string[]> GetRandomBookIDs(int count)
    {
        var bookIDs = new string[count];
        
        for (int i = 0; i < count; i++)
        {
            bookIDs[i] = await GetRandomBookID();
        }

        return bookIDs;
    }

    private async Task<BookDTO> GetBookDTO(string bookID)
    {
        try
        {
            var url = $"{_openLibraryUrl}/books/{bookID}.json";
            var pageContent = await ScrapePage(url);

            try
            {
                var bookDTO = JsonConvert.DeserializeObject<BookDTO>(pageContent);

                Console.WriteLine($"{bookDTO.title}, {bookDTO?.authors is not null}");

                return bookDTO;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

        return null;
    }

    public async Task<List<BookDTO>> GetBookDTOs(string[] bookIDs)
    {
        var bookDTOs = new List<BookDTO>();
    
        foreach (var bookID in bookIDs)
        {
            bookDTOs.Add(await GetBookDTO(bookID));
        }

        return bookDTOs;
    }

    private async Task AddAuthorToBook(BookDTO bookDTO)
    {
        bookDTO.AuthorDTO = new List<AuthorDTO>();

        if (bookDTO?.authors is not null)
        {
            foreach (var author in bookDTO.authors)
            {
                var url = $"{_openLibraryUrl}/{author.key}.json";

                try
                {
                    var pageContent = await ScrapePage(url);

                    try
                    {
                        var authorDTO = JsonConvert.DeserializeObject<AuthorDTO>(pageContent);
                        bookDTO.AuthorDTO.Add(authorDTO);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }
    }

    public async Task AddAuthorsToBooks(List<BookDTO> bookDTOs)
    {
        foreach (var bookDTO in bookDTOs)
        {
            await AddAuthorToBook(bookDTO);
        }
    }



}