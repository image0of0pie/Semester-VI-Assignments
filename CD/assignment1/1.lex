%{
#include <stdio.h>
int lines=0,words=0,chars=0;
%}
 
 
%%
\n {lines++;words++;chars++;}
([ ])+ {words++;chars+=yyleng;}
. chars++;
end return 0;
%%
 
 
int yywrap(){}
 
int main()
{
    
    printf("Enter input = ");
    yylex();
 
    printf("No of lines = %d\n",lines);
    printf("No of words = %d\n",words);
    printf("No of characters = %d\n",chars);
	return 0;
}
