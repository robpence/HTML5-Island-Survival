var dll = new DoublyLinkedList();
var dialogLineNumber = 0;

//loads the textfile into the dll
function loadTextToDisplay(textfile){
	//read textfile line by line and put it into a doublylinkedlist
    var lines = textfile.split('\n');
    for(var line = 0; line < lines.length; line++){
      	console.log(lines[line]);
      	dll.push(lines[line]);
    }

}

//displays the text based on the line number
function displayText(){

	//set text to be visible
	dialogLabel.visible = true;
	dialogbackground.visible  = true;

	//if enter or space is hit advance the dialog
	//game.input.keyboard.onUpCallback = function( e ){ 
	//	if(e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.SPACEBAR){ 
	//		//increase the linenumber by 1 to go to the next dialog line
	//		dialogLineNumber += 1;
	//		console.log(dll.getItem(dialogLineNumber));
	//	}
	//}

	//get the dialog line
	if(dll.getItem(dialogLineNumber) == null){
		dialogLabel.visible = false;
		dialogbackground.visible  = false;
	}
	else{
		dialogLabel.setText(dll.getItem(dialogLineNumber));
	}
}

//creates a doubly linked list
function DoublyLinkedList(){
   this.head = null;
}

//add things to list
DoublyLinkedList.prototype.push = function(val){
   var head = this.head,
       current = head,
       previous = head;
  	
  	if(!head){
    	this.head = {value: val, previous:null, next:null };
  	}
  	else{
    	
    	while(current && current.next){
        	previous = current;
        	current = current.next;
    	}     
    	current.next = {value: val, previous:current, next:null}
  	}

}

//gets a element of the list at a certian index
DoublyLinkedList.prototype.getItem = function(index){ 
	//check for out-of-bounds values
    if (index > -1 && index <= this.getSize()){
        var current = this.head,
        i = 0;        
    	while(i++ < index){
    		current = current.next;            
    	}
		return current.value;
    } 
    else {
        return null;
    }
}

//gets the size of the list because ._length didn't work
DoublyLinkedList.prototype.getSize = function(){
	var current = this.head,
	i = 0;
	while(current.next != null){
		i += 1;
		current = current.next;
	}
	return i;
}