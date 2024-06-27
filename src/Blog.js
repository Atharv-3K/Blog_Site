import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Blog = ({ title, content, author }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{author}</Typography>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
};

export default Blog;
