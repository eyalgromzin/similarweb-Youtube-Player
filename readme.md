to run project: 
npm run dev

- because youtube prevents autostart videos with sounds , the sound is off.

- i didnt use redux , because its a small app. 

- to make playlist easier for parsing, in the server its saved as playlist = { playlist: [] }

- the load of the playlist from file is done once when the server is loading - not effecting concurrency 

- i didnt use usecallback / usememo / React.memo because the assignment with the extra subTasks wasnt small as it is.

- on client actions such as remove / swap / add the server only returns a success/fail status for enabling each client individual control of 
  the playlist . and only on load it loads everybodys playlist 

- playlist item has a unique id - which makes the remove item remove only the specific item. even if there are multiple same youtube urls in 
  the list. 

- to support multiple concurrent reads / writes there are a few ways: 
  - the only problematic code in the server is the file read/write to save/load the playlist 
    option 1: lock mechanism: 
      - writes - its possible to create a lock mechanism using a file. create lock file when acquire a lock, delete when releasing a lock or delete after
        a timeout has occurred, 
        every time there is a change in the playlist - a write - lock the file . 
      - reads - possible only while file is not locked. enable multiple read simultaneously

    option 2: 
      - another solution could be a read/write queue. as an additional unit  / in the server code. 
        will let all reads read the file . 
        but while writing the file will not enable any reads until the write is finished. 

    and probably there are many more options 
