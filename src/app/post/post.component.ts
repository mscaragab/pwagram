import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedService } from '../feed/feed.service';
import { Post } from '../feed/post.model';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('video') videoElRef: ElementRef;
  @ViewChild('canvas') canvasElRef: ElementRef;
  @ViewChild('pickImage') pickImageElRef: ElementRef;
  @ViewChild('imageInput') imageInputElRef: ElementRef;

  location: string = '';

  camera = false;
  image;
  inputFileImage = '';

  constructor(
    private feedService: FeedService,
    private util: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeMedia();
  }

  initializeMedia() {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          (<HTMLVideoElement>this.videoElRef.nativeElement).srcObject = stream;
          (<HTMLVideoElement>this.videoElRef.nativeElement).style.display =
            'block';
          this.camera = true;
        })
        .catch((err) => {
          // (<HTMLInputElement>this.pickImageElRef.nativeElement).style.display =
          //   'block';
          // (<HTMLVideoElement>this.videoElRef.nativeElement).style.display =
          //   'none';
          //display fallback image picker
        });
    }
  }

  onSubmit(form: NgForm) {
    this.captureImage();
    this.stopCamera();
    const post = new Post(form.value.title, form.value.location, this.image);
    this.feedService.addPost(post);
    this.util.showNotification(post.title, post.location, post.image);
    this.router.navigate(['/']);
    console.log(form.value);
  }

  onImageSelect(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      (<HTMLCanvasElement>this.canvasElRef.nativeElement)
        .getContext('2d')
        .drawImage(fileInput.target.files[0], 0, 0, 100, 100);
      console.log(fileInput.target.files[0]);
      // this.image = URL.createObjectURL(fileInput.target.files[0]);
    }
  }

  onGetLocation() {
    const promise: Promise<string> = this.util.getLocation();
    promise.then((location) => {
      this.location = location;
    });
  }

  private captureImage() {
    (<HTMLCanvasElement>this.canvasElRef.nativeElement).style.display = 'block';

    (<HTMLVideoElement>this.videoElRef.nativeElement).style.display = 'none';

    const canvasWidth = (<HTMLCanvasElement>this.canvasElRef.nativeElement)
      .width;

    const videoWidth = (<HTMLVideoElement>this.videoElRef.nativeElement)
      .videoWidth;
    const videoHeight = (<HTMLVideoElement>this.videoElRef.nativeElement)
      .videoHeight;

    // 640 = 300   480
    //640 x 480
    //300
    const imageWidth = (<HTMLVideoElement>this.canvasElRef.nativeElement).width;
    const imageHeight = videoHeight / (videoWidth / canvasWidth);

    (<HTMLCanvasElement>this.canvasElRef.nativeElement)
      .getContext('2d')
      .drawImage(
        <HTMLVideoElement>this.videoElRef.nativeElement,
        0,
        0,
        imageWidth,
        imageHeight
      );

    console.log('Video Width, Video Height: ', videoWidth, videoHeight);
    console.log('Image Width, ImageHeight: ', imageWidth, imageHeight);

    this.image = (<HTMLCanvasElement>(
      this.canvasElRef.nativeElement
    )).toDataURL();
  }

  private stopCamera() {
    if (this.camera) {
      (<MediaStream>(<HTMLVideoElement>this.videoElRef.nativeElement).srcObject)
        .getVideoTracks()
        .forEach((track) => {
          track.stop();
        });
      (<HTMLVideoElement>this.videoElRef.nativeElement).style.display = 'none';
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}
