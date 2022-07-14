namespace OpenLibraryToDatabase;

public class AuthorDTO
{
    public string name { get; set; }
    public string personal_name { get; set; }
    public LastModified last_modified { get; set; }
    public string key { get; set; }
    public Type type { get; set; }
    public int id { get; set; }
    public int revision { get; set; }
    public string DatabaseID { get; set; }
}