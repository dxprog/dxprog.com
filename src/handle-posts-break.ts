import { 
  IPost,
  SiteGenerator } from 'staticr-site';

const BREAK_TAG = '[break]';

export function handlePostsBreak(posts: Array<IPost>, siteGenerator: SiteGenerator): Array<IPost> {
  return posts.map(post => {    
    if (post.html.indexOf(BREAK_TAG) > -1) {
        // No mutating, please
        const postCopy = Object.create(post);
        postCopy.html = `${postCopy.html.split(BREAK_TAG)[0]}\n\n<p><a href="${siteGenerator.generateUrl(`entry/${postCopy.attributes.slug}`)}">Continue Reading</a></p>`;
        return postCopy;
    } else {
        return post;
    }
  });
}