component accessors="true" {

    property name="firstName"   type="string";
    property name="lastName"    type="string";

    public Person function init(
        required string firstName,
        required string lastName
    ){
        setFirstName( arguments.firstName );
        setLastName( arguments.lastName );
        return this;
    }

    public string function getFullName(){
        return this.getFirstName() & ' ' & this.getLastName();
    }

}


component accessors="true" {

    property name="person"          type="Person";
    property name="baseGreeting"    type="string" default="Hello, ";

    public Greeting function init(
        required Person person,
        string baseGreeting = variables.baseGreeting
    ){
        setPerson( arguments.person );
        setBaseGreeting( arguments.baseGreeting );
        return this;
    }

    public string function getFullName(){
        return getPerson().getFullName();
    }

    public string function getGreeting(
        string baseGreeting = getBaseGreeting()
    ){
        var fullName = this.getFullName( argumentCollection = arguments );
        var greeting = arguments.baseGreeting & fullName;

        return greeting;
    }
}