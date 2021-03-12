
%{ 
int lines = 0; 
int chars = 0; 
int words = 0;
%} 
%% 
" "   ++words;
.    {chars++;}
"\n" {++lines;++words;}
%% 

int yywrap(){} 
int main(int argc, char **argv) 
{ 
yylex(); 
printf("number of lines = %d, number of chars = %d, number of words = %d\n", 
	lines, chars, words ); 

return 0; 
} 
