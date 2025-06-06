# Keep Note

Keep Note is a simple and efficient note-taking application designed to help you organize your thoughts and ideas.
Use AI to resume your note(s)
- Inspired by a modern [google keep](https://keep.google.com/) web applications.

## Features

- [x] CRUD  note
- [ ]  Note archiving
    - [x] List of normal notes
    - [ ] List of notes archived
- [ ] AI to resume<span style="color: green;"> **[Coming Soon]**</span>
    - [ ] a note or 
    - [ ] or a list of notes selected
- [ ] Pwa
- [ ] Organize notes with tags or categories.
- [ ] Search functionality to quickly find notes.

## Installation & run

1. Clone the repository:
    ```bash
    git clone https://github.com/Moufid17/keep-note.git
    ```
2. Navigate to the project directory:
    ```bash
    cd keep-note
    ```
3. Create and fill `.env` file :
    ```
    # Database Config (Supabase)
    DATABASE_URL=

    SUPABASE_URL=
    SUPABASE_ANON_KEY=

    # App config (local)
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

    NB : <br/>
    - Production app config <br/>
        ```
        NEXT_PUBLIC_BASE_URL=<YOUR_PRODUCTION_URL> 
        ```
    
4. Run the app docker images, install dependencies and run it
    ```bash
    make up && make install
    make dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments


