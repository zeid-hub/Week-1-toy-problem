let grades;
function myGrades(score){
if (score > 79){
   return 'A'
}
else if (score >= 60){
  return 'B'
}
else if (score >=50){
  return 'C'
}
else if (score >=40){
 return 'D'
}
else{
  return 'E'
}
}
console.log(myGrade(56));