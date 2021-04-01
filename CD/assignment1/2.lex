%{
    #include <stdio.h>
    int floating = 0,integer = 0,total = 0;
%}
 
 
%%
[+-]?[.][0-9]*
[+-]?[0-9]*[.]
 
[+-]?[0-9]+[.][0-9]+ {floating++;total++;}
[+-]?[0-9]+ {integer++;total++;}
\n return 0;
%%
 
int yywrap()        
{}
 
int main(){
 
    printf("Enter input = ");  
    yylex();
 
    printf("\nTotal numbers : %d \n",total);
    printf("Floating Numbers  : %d \n",floating);
    printf("Integer Numbers : %d \n",integer);
 
    return 0;
}
