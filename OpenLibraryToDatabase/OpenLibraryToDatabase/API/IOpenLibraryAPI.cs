namespace OpenLibraryToDatabase;

public interface IOpenLibraryAPI
{
    public Task<string[]> GetRandomBookIDs(int count);
    public Task<List<BookDTO>> GetBookDTOs(string[] bookIDs);
    public Task AddAuthorsToBooks(List<BookDTO> bookDTOs);
}