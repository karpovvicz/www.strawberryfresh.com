import PostItem from './PostItem';
import classes from './PostList.module.css';

function PostList(props) {

    return (
        <section className="space-y-8 w-full">
            <ul className={classes.list}>
                {props.posts.map((post, index) => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        video={post.video}
                        title={post.title}
                        description={post.description}
                        subreddit={post.subreddit}
                        upvotes={post.upvotes}
                        address={post.address}
                        slug={post.slug}
                        category={post.category}
                        source={post.source}
                        createdAt={post.createdAt}
                        onPostClick={() => props.onPostClick && props.onPostClick(index)}
                    />
                ))}
            </ul>

        </section>
    );
}

export default PostList;
