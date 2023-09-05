sequenceDiagram
    participant browser
    participant server
    
    browser->>server:POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: sends the notes as a JSON-string
    deactivate server

