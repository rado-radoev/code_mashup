package main

import (
	"fmt"
	"log"
	"net/http"
)

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, you requested: %s", r.URL.Path)
	log.Printf("Received request for path: %s", r.URL.Path)
}

func main() {
	var addr string = ":8180"
	handler := httpHandlerFunc(HelloServer)
	if err := http.ListenAndServer(addr, handler); err != nil {
		log.Fatalf("Could not listen on port %s %v", add, err)
	}
}
