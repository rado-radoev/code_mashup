##
## Auto Generated makefile by CodeLite IDE
## any manual changes will be erased      
##
## Release
ProjectName            :=TestProject
ConfigurationName      :=Release
WorkspaceConfiguration := $(ConfigurationName)
WorkspacePath          :=/Users/superlamer/GitHub/code_mashup/c++/CPPWorkspace
ProjectPath            :=/Users/superlamer/GitHub/code_mashup/c++/CPPWorkspace/TestProject
IntermediateDirectory  :=../build-$(ConfigurationName)/TestProject
OutDir                 :=../build-$(ConfigurationName)/TestProject
CurrentFileName        :=
CurrentFilePath        :=
CurrentFileFullPath    :=
User                   :=Radoslav Radoev
Date                   :=03/09/2019
CodeLitePath           :="/Users/superlamer/Library/Application Support/CodeLite"
LinkerName             :=/usr/bin/g++
SharedObjectLinkerName :=/usr/bin/g++ -dynamiclib -fPIC
ObjectSuffix           :=.o
DependSuffix           :=.o.d
PreprocessSuffix       :=.i
DebugSwitch            :=-g 
IncludeSwitch          :=-I
LibrarySwitch          :=-l
OutputSwitch           :=-o 
LibraryPathSwitch      :=-L
PreprocessorSwitch     :=-D
SourceSwitch           :=-c 
OutputFile             :=../build-$(ConfigurationName)/bin/$(ProjectName)
Preprocessors          :=$(PreprocessorSwitch)NDEBUG 
ObjectSwitch           :=-o 
ArchiveOutputSwitch    := 
PreprocessOnlySwitch   :=-E
ObjectsFileList        :=$(IntermediateDirectory)/ObjectsList.txt
PCHCompileFlags        :=
LinkOptions            :=  
IncludePath            :=  $(IncludeSwitch). $(IncludeSwitch). 
IncludePCH             := 
RcIncludePath          := 
Libs                   := 
ArLibs                 :=  
LibPath                := $(LibraryPathSwitch). 

##
## Common variables
## AR, CXX, CC, AS, CXXFLAGS and CFLAGS can be overriden using an environment variables
##
AR       := /usr/bin/ar rcu
CXX      := /usr/bin/g++
CC       := /usr/bin/gcc
CXXFLAGS := -std=c++14 -Wall -O2 -Wall $(Preprocessors)
CFLAGS   :=  -O2 -Wall $(Preprocessors)
ASFLAGS  := 
AS       := /usr/bin/as


##
## User defined environment variables
##
CodeLiteDir:=/private/var/folders/02/0m9hsncd5t549rlzp97g92sr0000gn/T/AppTranslocation/99A9F532-5E8E-4560-9E74-42717DD1CDAD/d/codelite.app/Contents/SharedSupport/
Objects0=../build-$(ConfigurationName)/TestProject/main.c$(ObjectSuffix) 



Objects=$(Objects0) 

##
## Main Build Targets 
##
.PHONY: all clean PreBuild PrePreBuild PostBuild MakeIntermediateDirs
all: MakeIntermediateDirs $(OutputFile)

$(OutputFile): ../build-$(ConfigurationName)/TestProject/.d $(Objects) 
	@mkdir -p "../build-$(ConfigurationName)/TestProject"
	@echo "" > $(IntermediateDirectory)/.d
	@echo $(Objects0)  > $(ObjectsFileList)
	$(LinkerName) $(OutputSwitch)$(OutputFile) @$(ObjectsFileList) $(LibPath) $(Libs) $(LinkOptions)

MakeIntermediateDirs:
	@mkdir -p "../build-$(ConfigurationName)/TestProject"
	@mkdir -p ""../build-$(ConfigurationName)/bin""

../build-$(ConfigurationName)/TestProject/.d:
	@mkdir -p "../build-$(ConfigurationName)/TestProject"

PreBuild:


##
## Objects
##
../build-$(ConfigurationName)/TestProject/main.c$(ObjectSuffix): main.c ../build-$(ConfigurationName)/TestProject/main.c$(DependSuffix)
	$(CC) $(SourceSwitch) "/Users/superlamer/GitHub/code_mashup/c++/CPPWorkspace/TestProject/main.c" $(CFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/main.c$(ObjectSuffix) $(IncludePath)
../build-$(ConfigurationName)/TestProject/main.c$(DependSuffix): main.c
	@$(CC) $(CFLAGS) $(IncludePath) -MG -MP -MT../build-$(ConfigurationName)/TestProject/main.c$(ObjectSuffix) -MF../build-$(ConfigurationName)/TestProject/main.c$(DependSuffix) -MM main.c

../build-$(ConfigurationName)/TestProject/main.c$(PreprocessSuffix): main.c
	$(CC) $(CFLAGS) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) ../build-$(ConfigurationName)/TestProject/main.c$(PreprocessSuffix) main.c


-include ../build-$(ConfigurationName)/TestProject//*$(DependSuffix)
##
## Clean
##
clean:
	$(RM) -r $(IntermediateDirectory)


