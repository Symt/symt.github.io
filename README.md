# WPM and Click Speed Test

## How to contribute

### Adding Word Lists
Adding word lists is simple, just go to words.js and make a new variable and add your words to the list. Do not repeat words when making lists and do not use extremely uncommon words or words that would be hard to type.
```
var word_bank(NUMBER BEFORE) = ['wordA','wordB','wordC'...];
var word_bank(NEXT NUMBER) = ['word1','word2','word3'...];
full_bank = word_bank.concat(word_bank2,...);
```
Once you are done adding words to your list, go to the last line and add your variable to the full_bank squasher.
```
full_bank = word_bank.concat(word_bank2,word_bank3 ... word_bank(NUMBER BEFORE), word_bank(YOUR NUMBER));
```

### Fixing Bugs
If there is a bug and it isn't fixed, it will be posted at https://github.com/Symt/symt.github.io/issues

If you find a bug that needs fixing, post it there.

### Improving Quality
Things that might be added

- Improved error calculation
- More Word Lists
- Better Format
- Option to change themes