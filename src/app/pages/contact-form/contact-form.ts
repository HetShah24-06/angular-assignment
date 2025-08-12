import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'],
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  submitting = false;
  successMsg = '';
  errorMsg = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get f() {
    return this.form.controls;
  }

  submit(): void {
    this.successMsg = this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    this.api
      .createPost({
        title: this.f.name.value,
        body: this.f.message.value,
        userId: 1,
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.successMsg = 'Thanks! Your message was submitted.';
          this.form.reset();
        },
        error: () => {
          this.submitting = false;
          this.errorMsg = 'Submission failed. Please try again.';
        },
      });
  }
}
