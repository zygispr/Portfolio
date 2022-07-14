namespace OpenLibraryToDatabase;

public class BookDTO
{
    public List<string> publishers { get; set; }
    public int number_of_pages { get; set; }
    public string subtitle { get; set; }
    public List<int> covers { get; set; }
    public List<string> lc_classifications { get; set; }
    public string key { get; set; }
    public List<Authors> authors { get; set; }
    public string ocaid { get; set; }
    public List<string> publish_places { get; set; }
    public List<string> isbn_13 { get; set; }
    public string pagination { get; set; }
    public List<string> source_records { get; set; }
    public string title { get; set; }
    public Identifiers identifiers { get; set; }
    public List<Language> languages { get; set; }
    public List<string> local_id { get; set; }
    public string publish_date { get; set; }
    public string publish_country { get; set; }
    public string by_statement { get; set; }
    public List<string> oclc_numbers { get; set; }
    public List<Work> works { get; set; }
    public Type type { get; set; }
    public List<string> lccn { get; set; }
    public int latest_revision { get; set; }
    public int revision { get; set; }
    public Created created { get; set; }
    public LastModified last_modified { get; set; }
    public List<AuthorDTO> AuthorDTO { get; set; }
}