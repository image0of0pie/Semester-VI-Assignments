%{
#include <stdio.h>
int count=0;
%}
 
%%
 
[aeiouAEIOU][a-zA-Z]* count++;
[a-zA-Z]*
 
\n return 0;
%%
 
 
int yywrap(){}
 
int main()
{
    
    printf("Enter input = ");
    yylex();
 
   
    printf("No of Words with first letter as vowel= %d\n",count);
   
}
