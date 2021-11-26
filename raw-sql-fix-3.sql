SELECT
	b.title AS book_title,
	CONCAT(
		a.first_name,
		' ',
		a.last_name
	) AS author_name
FROM books AS b
INNER JOIN authors AS a
	ON b.author_id = a.id
WHERE (
	b.title = 'The Shining' 
		OR 
	a.last_name = 'Canavan'
);