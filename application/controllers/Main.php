<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller 
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Message');
         $this->load->helper(array('form', 'url'));
               
    }

	public function index()
	{
		$this->load->view('index1');

	}


    public function add_message()
    {
        $post=$this->input->post();

            $data=array(
                'Name'=>$post['username'],
                'Email'=>$post['Email'],
                'Subject'=>$post['subject'],
                'Message'=>$post['message']
                );
    


            $insertMessage=$this->Message->add_message($data);

            //Storing insertion status message
            if($insertMessage)
            {
                $this->session->set_flashdata('success_msg',"Message have been sent successfully.");
            }
            else
            {
                $this->session->set_flashdata('error_msg',"Unable to send message, please try again");
            }
            
            redirect('/');

    }

    public function subscribe()
    {
            $post=$this->input->post();

            $data=array(
                'Email'=>$post['Email']
                );
    
            $insertMessage=$this->Message->add_subscriber($data);

            //Storing insertion status message
            if($insertMessage)
            {
                $this->session->set_flashdata('success_msg',"Email have been added successfully.");
            }
            else
            {
                $this->session->set_flashdata('error_msg',"Unable to add email, please try again");
            }
            
            redirect('/');
    }


}